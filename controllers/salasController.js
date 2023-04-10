const { getSalasDB, addSalaDB, updateSalaDB, deleteSalaDB, getSalaPorCodigoDB } = require('../useCases/salaUseCases');
  
  const getSalas = async (request, response) => {
      await getSalasDB()
            .then(data => response.status(200).json(data))
            .catch(err => {
              response.status(400).json({
                  status : 'error',
                  message : 'Erro ao consultar as salas: ' + err
              })
            })
  }
  
  const addSala = async(request, response) => {
    await addSalaDB(request.body)
          .then(data => response.status(200).json({
            status: "success", message: "Sala Criada!",
            objeto: data 
          }))
          .catch (err => response.status(400).json({
            status: 'error',
            message: err
          }));
  }
  
  const updateSala = async(request, response) => {
    await updateSalaDB(request.body)
          .then(data => response.status(200).json({
            status: "success", message: "Sala Alterada!",
            objeto: data 
          }))
          .catch (err => response.status(400).json({
            status: 'error',
            message: err
          }));
  }
  
  const deleteSala = async(request, response) => {
    await deleteSalaDB(parseInt(request.params.codigo))
          .then(data => response.status(200).json({
            status: "success", message: data,
            objeto: data 
          }))
          .catch (err => response.status(400).json({
            status: 'error',
            message: err
          }));
  }
  
  const getSalaPorCodigo = async(request, response) => {
    await getSalaPorCodigoDB(parseInt(request.params.codigo))
          .then(data => response.status(200).json(data))
          .catch (err => response.status(400).json({
            status: 'error',
            message: err
          }));
  }
  
  
  
  module.exports = { getSalas, addSala, updateSala, deleteSala, getSalaPorCodigo }