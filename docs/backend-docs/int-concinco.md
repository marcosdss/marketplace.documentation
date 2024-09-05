# Integrações Consinco

A integração com a Consinco funciona da seguinte forma.

1. Masterdata Vtex Customer tem uma trigger criada que chama uma API na Wevo.
1. A API da Wevo (webhook) coloca a mensagem na fila integration-vtex-customer
1. O job CustomerIntegration do Oba Connectors lê a fila, faz chamada na Vtex para pegar as informações do cliente e então coloca na fila customer.
1. O job Customer do Oba Core lê a fila e salva no SQL Server.
1. O job CustomerIntegration do Oba Core pega os registros pendentes do SQL Server, faz algumas verificações e chama uma API que salva na Consinco tanto do cliente quanto dos endereços.