import React, { useRef, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import emailjs from '@emailjs/browser';
import { useDispatch } from 'react-redux';
import { addToast } from '../redux/ui/uiSlice';

import { contactService } from '../services';

const Contact = () => {
    const form = useRef();
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            subject: '',
            message: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Requerido'),
            email: Yup.string().email('Email inválido').required('Requerido'),
            subject: Yup.string().required('Requerido'),
            message: Yup.string().required('Requerido'),
        }),
        onSubmit: async (values, { resetForm }) => {
            setLoading(true);
            try {
                // Mandamos la data al back
                await contactService.submit(values);
                dispatch(addToast({ id: Date.now(), msg: '¡Mensaje enviado con éxito!', type: 'success' }));
                resetForm();
            } catch (error) {
                console.error('FAILED...', error);
                dispatch(addToast({ id: Date.now(), msg: error.message || 'Error al enviar. Intenta nuevamente.', type: 'error' }));
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
                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Enviando...' : 'Enviar'}
                </button>
            </form>
        </section>
    );
};
export default Contact;
