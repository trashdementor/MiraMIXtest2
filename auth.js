const jwt = require('jsonwebtoken');

// Middleware для проверки JWT токена
exports.auth = (req, res, next) => {
  // Получение токена из заголовка
  const token = req.header('x-auth-token');

  // Проверка наличия токена
  if (!token) {
    return res.status(401).json({ message: 'Нет токена, авторизация отклонена' });
  }

  try {
    // Верификация токена
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Добавление данных пользователя в объект запроса
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Токен недействителен' });
  }
};

// Middleware для проверки прав администратора
exports.admin = (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: 'Доступ запрещен, требуются права администратора' });
  }
  next();
}; 