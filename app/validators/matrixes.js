const { check } = require('express-validator');
const { validateResult } = require('../helpers/validateHelper');

const validateMatrix = [
    check('matrix')
        .exists()
        .withMessage('Matrix is required')
        .isArray({ min: 1 })
        .withMessage('Matrix must be a non-empty array')
        .custom((matrix) => {
            const numCols = matrix[0].length;

            // Verificar que todas las filas tengan el mismo número de columnas
            const isRectangular = matrix.every(row => row.length === numCols);

            if (!isRectangular) {
                throw new Error('Matrix must be rectangular');
            }

            return true;
        }),
    (req, res, next) => {
        validateResult(req, res, next);
    }
];

module.exports = { validateMatrix };