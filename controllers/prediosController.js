const { getPrediosDB, addPredioDB,
  updatePredioDB, deletePredioDB, getPredioPorCodigoDB } = require('../useCases/predioUseCases');

const getPredios = async (request, response) => {
    await getPrediosDB()
          .then(data => response.status(200).json(data))
          .catch(err => {
            response.status(400).json({
                status : 'error',
                message : 'Erro ao consultar os prédios: ' + err
            })
          })
}

const addPredio = async(request, response) => {
  await addPredioDB(request.body)
        .then(data => response.status(200).json({
          status: "success", message: "Prédio Criado!",
          objeto: data 
        }))
        .catch (err => response.status(400).json({
          status: 'error',
          message: err
        }));
}

const updatePredio = async(request, response) => {
  await updatePredioDB(request.body)
        .then(data => response.status(200).json({
          status: "success", message: "Prédio Alterado!",
          objeto: data 
        }))
        .catch (err => response.status(400).json({
          status: 'error',
          message: err
        }));
}

const deletePredio = async(request, response) => {
  await deletePredioDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json({
          status: "success", message: data,
          objeto: data 
        }))
        .catch (err => response.status(400).json({
          status: 'error',
          message: err
        }));
}

const getPredioPorCodigo = async(request, response) => {
  await getPredioCodigoDB(parseInt(request.params.codigo))
        .then(data => response.status(200).json(data))
        .catch (err => response.status(400).json({
          status: 'error',
          message: err
        }));
}



module.exports = { getPredios, addPredio, updatePredio, deletePredio, getPredioPorCodigo }