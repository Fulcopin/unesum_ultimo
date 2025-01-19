export const checkScopus = async (pdf, token) => {
    const formData = new FormData();
    formData.append('pdf', pdf);

    try {
        const response = await axios.post('http://localhost:5000/api/check-scopus', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': token,
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error al verificar en Scopus');
    }
};
