import api from './api';

const handleAxiosError = (error) => {
    // Aca agarramos el error que nos tira axios
    if (error.response && error.response.data && error.response.data.message) {
        throw new Error(error.response.data.message);
    }
    throw new Error(error.message || 'Error de conexión');
};

export const authService = {
    register: async (userData) => {
        try {
            const response = await api.post('/auth/register', userData);
            if (response.data.success) {
                const { user, token } = response.data.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                return { user, token };
            }
            throw new Error(response.data.message || 'Error al registrarse');
        } catch (error) {
            handleAxiosError(error);
        }
    },

    login: async (credentials) => {
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.success) {
                const { user, token } = response.data.data;
                localStorage.setItem('token', token);
                localStorage.setItem('user', JSON.stringify(user));
                return { user, token };
            }
            throw new Error(response.data.message || 'Error al iniciar sesión');
        } catch (error) {
            handleAxiosError(error);
        }
    },

    getMe: async () => {
        try {
            const response = await api.get('/auth/me');
            if (response.data.success) {
                return response.data.data.user;
            }
            throw new Error(response.data.message);
        } catch (error) {
            handleAxiosError(error);
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
};

export const productsService = {
    getAll: async (category = null) => {
        try {
            const url = category ? `/products?category=${category}` : '/products';
            const response = await api.get(url);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            handleAxiosError(error);
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/products/${id}`);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            handleAxiosError(error);
        }
    },

    getByCategory: async (category) => {
        try {
            const response = await api.get(`/products/category/${category}`);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            handleAxiosError(error);
        }
    }
};

export const ordersService = {
    create: async (orderData) => {
        try {
            const response = await api.post('/orders', orderData);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            handleAxiosError(error);
        }
    },

    getMyOrders: async () => {
        try {
            const response = await api.get('/orders');
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            handleAxiosError(error);
        }
    },

    getById: async (id) => {
        try {
            const response = await api.get(`/orders/${id}`);
            if (response.data.success) {
                return response.data.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            handleAxiosError(error);
        }
    }
};

export const contactService = {
    submit: async (contactData) => {
        try {
            const response = await api.post('/contact', contactData);
            if (response.data.success) {
                return response.data;
            }
            throw new Error(response.data.message);
        } catch (error) {
            handleAxiosError(error);
        }
    }
};
