import Contact from '../models/Contact.js';

// Aca guardamos lo que mandan por el form de contacto
export const submitContact = async (req, res, next) => {
    try {
        const { name, email, subject, message } = req.body;

        const contact = await Contact.create({
            name,
            email,
            subject,
            message
        });

        res.status(201).json({
            success: true,
            message: 'Mensaje enviado correctamente. Te contactaremos pronto.',
            data: contact
        });
    } catch (error) {
        next(error);
    }
};

// Esto lo usaremos despues supongo
export const getContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: contacts.length,
            data: contacts
        });
    } catch (error) {
        next(error);
    }
};
