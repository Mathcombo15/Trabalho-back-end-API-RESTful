const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).json({
            message: 'Token não informado',
            status: 'fail'
        });
    }
    const [scheme, token] = authHeader.split(' ');
    if (scheme !== 'Bearer' || !token) {
        return res.status(401).json({
            message: 'Formato de token inválido',
            status: 'fail'
        });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // ex: { id: 1, email: '...' }
        return next();
    } catch (err) {
        console.error('Erro ao verificar token:', err.message);
        return res.status(401).json({
            message: 'Token inválido ou expirado',
            status: 'fail'
        });
    }
}

module.exports = authMiddleware;