// Middleware de log — registra cada requisição no terminal
export default function logger(req, res, next) {
  const agora = new Date().toISOString();     // timestamp no formato ISO
  const metodo = req.method;                   // GET, POST, PUT, DELETE
  const url = req.originalUrl;                 // URL completa da requisição
  const inicio = Date.now();

  res.on('finish', () => {
    const duracao = Date.now() - inicio;
    const status = res.statusCode;
    console.log(`[${agora}] ${metodo} ${url} ${status} - ${duracao}ms`);
  });

  next();                                      // passa para o próximo middleware/rota
}