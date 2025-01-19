import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScoringForm = ({ projectId }) => {
    const [indicators, setIndicators] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [projectRatings, setProjectRatings] = useState({});
    const [scores, setScores] = useState({}); // Añadido
    const [comments, setComments] = useState({}); // Añadido

    useEffect(() => {
        if (projectId) {
            fetchIndicatorsAndRatings();
        }
    }, [projectId]);

    const fetchIndicatorsAndRatings = async () => {
        try {
            setLoading(true);
            setError(null);

            // Obtener indicadores y calificaciones existentes
            const indicatorsResponse = await axios.get('http://localhost:5000/api/indicators');
            const ratingsResponse = await axios.get(`http://localhost:5000/api/moderator/ratings/${projectId}`);

            setIndicators(indicatorsResponse.data);

            // Procesar calificaciones existentes
            const ratingsMap = {};
            const existingScores = {};
            const existingComments = {};

            ratingsResponse.data.forEach(rating => {
                const indicatorId = rating.indicatorId;
                ratingsMap[indicatorId] = rating;
                existingScores[indicatorId] = rating.score;
                existingComments[indicatorId] = rating.comments;
            });

            setProjectRatings(ratingsMap);
            setScores(existingScores);
            setComments(existingComments);
        } catch (error) {
            console.error('Error al cargar datos:', error);
            setError('Error al cargar los datos. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    const handleScoreChange = (indicatorId, value) => {
        const score = Math.min(20, Math.max(0, parseInt(value) || 0));
        setScores(prev => ({
            ...prev,
            [indicatorId]: score
        }));
    };

    const handleCommentChange = (indicatorId, value) => {
        setComments(prev => ({
            ...prev,
            [indicatorId]: value
        }));
    };

    const handleSubmit = async (indicatorId) => {
        try {
            setLoading(true);
            setError(null);

            if (!scores[indicatorId]) {
                alert('Por favor ingrese una calificación');
                return;
            }

            const ratingData = {
                projectId,
                indicatorId,
                score: scores[indicatorId],
                comments: comments[indicatorId] || '',
                moderatorId: localStorage.getItem('moderatorId')
            };

            const existingRating = projectRatings[indicatorId];
            const endpoint = existingRating ? 'score' : 'score';

            const response = await axios.post(
                `http://localhost:5000/api/indicators/${endpoint}`,
                {
                    ...ratingData,
                    ratingId: existingRating?.id
                },
                {
                    headers: { 
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            if (response.data.success) {
                await fetchIndicatorsAndRatings();
                alert('Calificación guardada exitosamente');
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Error al guardar la calificación');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="loading">Cargando...</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="scoring-section">
            <h3>Calificación de Indicadores - Proyecto {projectId}</h3>
            <div className="table-container">
                <table className="scoring-table">
                    <thead>
                        <tr>
                            <th>Indicador</th>
                            <th>Descripción</th>
                            <th>Peso</th>
                            <th>Calificación (0-20)</th>
                            <th>Comentarios</th>
                            <th>Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {indicators.map(indicator => (
                            <tr key={indicator.id}>
                                <td>{indicator.name}</td>
                                <td>{indicator.description}</td>
                                <td>{indicator.weight}</td>
                                <td>
                                    <input
                                        type="number"
                                        min="0"
                                        max="20"
                                        value={scores[indicator.id] || ''}
                                        onChange={(e) => handleScoreChange(indicator.id, e.target.value)}
                                        className="score-input"
                                    />
                                </td>
                                <td>
                                    <textarea
                                        value={comments[indicator.id] || ''}
                                        onChange={(e) => handleCommentChange(indicator.id, e.target.value)}
                                        className="comment-input"
                                        placeholder="Agregar comentario..."
                                    />
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleSubmit(indicator.id)}
                                        className="save-button"
                                        disabled={loading}
                                    >
                                        {projectRatings[indicator.id] ? 'Actualizar' : 'Guardar'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ScoringForm;
