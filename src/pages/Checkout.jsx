import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { clearCart } from '../redux/cart/cartSlice';
import { addToast, openModal, openInfoModal } from '../redux/ui/uiSlice';
import { useNavigate } from 'react-router-dom';
import { ordersService } from '../services';

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems, shippingCost } = useSelector((state) => state.cart);
    const { currentUser } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    // Asegurarnos de que shippingCost tenga un valor numérico (evita NaN)
    const currentShippingCost = Number(shippingCost) || 500;
    const subtotal = cartItems.reduce((acc, item) => acc + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);
    const total = subtotal + currentShippingCost;

    const formik = useFormik({
        initialValues: {
            name: currentUser?.name || '',
            phone: '',
            address: '',
            city: '',
            zip: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Requerido'),
            phone: Yup.string().required('Requerido'),
            address: Yup.string().required('Requerido'),
            city: Yup.string().required('Requerido'),
            zip: Yup.string().required('Requerido'),
        }),
        onSubmit: async (values) => {
            if (cartItems.length === 0) {
                dispatch(addToast({ id: Date.now(), msg: 'El carrito está vacío', type: 'error' }));
                return;
            }

            if (!currentUser) {
                dispatch(addToast({ id: Date.now(), msg: 'Debes iniciar sesión para comprar', type: 'error' }));
                navigate('/login');
                return;
            }

            setLoading(true);
            try {
                // Alineamos los campos con el modelo del Backend
                const orderData = {
                    items: cartItems.map(item => ({
                        productId: item._id || item.id, // Preferimos _id para el modelo de la base de datos
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    })),
                    shippingInfo: values, // El backend espera shippingInfo
                    totalAmount: total,      // El backend espera totalAmount
                    shippingPrice: currentShippingCost // El backend espera shippingPrice
                };

                await ordersService.create(orderData);

                dispatch(clearCart());
                dispatch(addToast({ id: Date.now(), msg: '¡Pedido realizado con éxito!', type: 'success' }));

                // Redirigimos inmediatamente para que el modal se vea sobre la página de productos
                navigate('/products');

                dispatch(openInfoModal({
                    text: '¡Tu pedido ha sido recibido correctamente! Gracias por confiar en JAMR Store. Te contactaremos pronto.',
                    type: 'success',
                    redirectTo: null // Ya navegamos, así que no hace falta redirectTo aquí
                }));
            } catch (error) {
                console.error('Order Error:', error);
                dispatch(addToast({ id: Date.now(), msg: error.message || 'Error al procesar el pedido', type: 'error' }));
            } finally {
                setLoading(false);
            }
        },
    });

    if (cartItems.length === 0) {
        return (
            <section className="container section-padding" style={{ paddingTop: '120px', textAlign: 'center', minHeight: '80vh' }}>
                <h2>Tu carrito está vacío</h2>
                <button className="btn-primary" style={{ marginTop: '20px' }} onClick={() => navigate('/products')}>Volver a la tienda</button>
            </section>
        )
    }

    return (
        <section className="container section-padding" style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
            <h2>Finalizar Compra</h2>
            <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '40px' }}>
                {/* Resumen de lo que esta comprando */}
                <div style={{ flex: '1', minWidth: '300px', backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '15px', height: 'fit-content', border: '1px solid var(--primary-color)' }}>
                    <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--primary-color)', paddingBottom: '10px' }}>Resumen del Pedido</h3>
                    {cartItems.map(item => (
                        <div key={item.id || item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                            <span>{item.name} (x{item.quantity})</span>
                            <span style={{ color: 'var(--primary-color)' }}>${item.price * item.quantity}</span>
                        </div>
                    ))}
                    <div style={{ margin: '20px 0', borderTop: '1px solid #444', paddingTop: '15px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Subtotal:</span>
                            <span>${subtotal}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                            <span>Envío:</span>
                            <span>${currentShippingCost}</span>
                        </div>
                    </div>
                    <div style={{ marginTop: '20px', fontSize: '1.4rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                        Total: <span style={{ color: 'var(--primary-color)' }}>${total}</span>
                    </div>
                </div>

                {/* El form para que ponga donde vive */}
                <div style={{ flex: '1.5', minWidth: '300px' }}>
                    <form onSubmit={formik.handleSubmit} className="contact-form" style={{ maxWidth: '100%', margin: '0', textAlign: 'left' }}>
                        <h3 style={{ marginBottom: '20px' }}>Datos de Envío</h3>
                        <div className="form-group">
                            <label>Nombre Completo</label>
                            <input
                                type="text"
                                name="name"
                                placeholder="Nombre Completo"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.name}
                                style={{ borderColor: formik.touched.name && formik.errors.name ? 'red' : '' }}
                            />
                            {formik.touched.name && formik.errors.name && <small className="error-msg">{formik.errors.name}</small>}
                        </div>
                        <div className="form-group">
                            <label>Teléfono</label>
                            <input
                                type="text"
                                name="phone"
                                placeholder="Teléfono de contacto"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.phone}
                                style={{ borderColor: formik.touched.phone && formik.errors.phone ? 'red' : '' }}
                            />
                            {formik.touched.phone && formik.errors.phone && <small className="error-msg">{formik.errors.phone}</small>}
                        </div>
                        <div className="form-group">
                            <label>Dirección</label>
                            <input
                                type="text"
                                name="address"
                                placeholder="Calle y número"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.address}
                                style={{ borderColor: formik.touched.address && formik.errors.address ? 'red' : '' }}
                            />
                            {formik.touched.address && formik.errors.address && <small className="error-msg">{formik.errors.address}</small>}
                        </div>
                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div className="form-group" style={{ flex: 2 }}>
                                <label>Ciudad</label>
                                <input
                                    type="text"
                                    name="city"
                                    placeholder="Ciudad"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.city}
                                    style={{ borderColor: formik.touched.city && formik.errors.city ? 'red' : '' }}
                                />
                                {formik.touched.city && formik.errors.city && <small className="error-msg">{formik.errors.city}</small>}
                            </div>
                            <div className="form-group" style={{ flex: 1 }}>
                                <label>Cod. Postal</label>
                                <input
                                    type="text"
                                    name="zip"
                                    placeholder="CP"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zip}
                                    style={{ borderColor: formik.touched.zip && formik.errors.zip ? 'red' : '' }}
                                />
                                {formik.touched.zip && formik.errors.zip && <small className="error-msg">{formik.errors.zip}</small>}
                            </div>
                        </div>
                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '20px' }} disabled={loading}>
                            {loading ? 'Procesando...' : 'Finalizar Pedido'}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default Checkout;
