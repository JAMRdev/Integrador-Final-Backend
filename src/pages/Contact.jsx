import React, { useRef, useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToast } from '../redux/ui/uiSlice';

import { contactService } from '../services';

const Contact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const { currentUser } = useSelector(state => state.user);

    const formik = useFormik({
        initialValues: {
            name: currentUser?.name || '',
            email: currentUser?.email || '',
            subject: orderId ? `Consulta sobre Orden #${orderId}` : '',
            message: orderId ? `Me contacto por la orden #${orderId}: ` : '',
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Requerido'),
            email: Yup.string().email('Email inválido').required('Requerido'),
            subject: Yup.string().required('Requerido'),
            message: Yup.string().required('Requerido'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                // Guardamos el contacto en la base de datos
                await contactService.submit(values);

                // Mandamos el aviso por mail con EmailJS
                // Keys para EmailJS
                const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
                const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
                const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;



                // Si no hay llaves avisamos, pero ya se guardó en la DB
                if (!serviceId || !templateId || !publicKey) {
                    dispatch(addToast({
                        id: Date.now(),
                        msg: 'Mensaje guardado, pero falló el envío de correo (Faltan llaves).',
                        type: 'warning'
                    }));
                } else {
                    const result = await emailjs.send(
                        serviceId,
                        templateId,
                        {
                            name: values.name,      // Para {{name}}
                            title: values.subject,   // Para {{title}}
                            email: values.email,     // Para {{email}} (destinatario)
                            from_name: values.name,
                            from_email: values.email,
                            reply_to: values.email,
                            subject: values.subject,
                            message: values.message,
                        },
                        publicKey
                    );
                    // Éxito

                }

                dispatch(addToast({ id: Date.now(), msg: '¡Mensaje enviado con éxito!', type: 'success' }));
                resetForm();
            } catch (error) {
                // Error

                dispatch(addToast({ id: Date.now(), msg: 'Error al enviar. Intenta nuevamente.', type: 'error' }));
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <section className="contact container section-padding" style={{ paddingTop: '120px', minHeight: '80vh', textAlign: 'center' }}>
            <h2>Contáctanos</h2>

            <form onSubmit={formik.handleSubmit} className="contact-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Nombre"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.name}
                        style={{ borderColor: formik.touched.name && formik.errors.name ? 'var(--secundaryColor)' : '' }}
                    />
                    {formik.touched.name && formik.errors.name ? (
                        <small className="error-msg" style={{ display: 'block' }}>{formik.errors.name}</small>
                    ) : null}
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="subject"
                        placeholder="Asunto"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.subject}
                        style={{ borderColor: formik.touched.subject && formik.errors.subject ? 'var(--secundaryColor)' : '' }}
                    />
                    {formik.touched.subject && formik.errors.subject ? (
                        <small className="error-msg" style={{ display: 'block' }}>{formik.errors.subject}</small>
                    ) : null}
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        style={{ borderColor: formik.touched.email && formik.errors.email ? 'var(--secundaryColor)' : '' }}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <small className="error-msg" style={{ display: 'block' }}>{formik.errors.email}</small>
                    ) : null}
                </div>
                <div className="form-group">
                    <textarea
                        name="message"
                        placeholder="Mensaje"
                        rows="5"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.message}
                        style={{ borderColor: formik.touched.message && formik.errors.message ? 'var(--secundaryColor)' : '' }}
                    ></textarea>
                    {formik.touched.message && formik.errors.message ? (
                        <small className="error-msg" style={{ display: 'block' }}>{formik.errors.message}</small>
                    ) : null}
                </div>
                <button type="submit" className="btn-primary" disabled={loading} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto', gap: '8px' }}>
                    {loading ? <><span className="spinner"></span> Enviando...</> : 'Enviar'}
                </button>
            </form>
        </section>
    );
};
export default Contact;
