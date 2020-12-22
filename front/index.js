window.addEventListener('load', function() {
  async function sendData() {
    try {
      let nombre = document.getElementById('nombre').value;
      if (!nombre) return alert('El nombre es requerido');
      let data = {
        nombre: nombre,
        sangre: document.getElementById('sangre').value,
        alergias: []
      };
      console.log(data);
      let response = await fetch('http://localhost:5000/api/', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        let json = await response.json();
        alert('Se envió el expediente y se generó la clave' + json.uuid);
      } else {
        alert('HTTP-Error: ' + response.status);
      }
    } catch (error) {
      console.error(error.message);
      alert('No pudieron mandar los datos');
    }
  }

  async function listarUUIDS() {
    try {
      let uuid = document.getElementById('uuid').value;

      let response = await fetch('http://localhost:5000/api/' + uuid, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        }
      });
      let expedientes = document.getElementById('expedientes');
      if (response.ok) {
        // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
        let lista = '';
        json.forEach(el => {
          console.log(el);
          lista += '<p>' + el.uuid + '</p>';
        });
        console.log(response);
        expedientes.innerHTML = lista;
        //   console.log(json);
      } else {
        alert('HTTP-Error: ' + response.status);
      }
    } catch (error) {
      console.error(error.message);
      alert('No pudo realizarse la consulta');
    }
  }

  async function buscarData() {
    try {
      let uuid = document.getElementById('uuid').value;
      if (!uuid) {
        alert('No se ingresó una clave de busqueda');
      }
      let response = await fetch('http://localhost:5000/api/' + uuid, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Origin': 'http://localhost:5000'
        }
      });
      let expedientes = document.getElementById('expedientes');
      if (response.ok) {
        // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
        let lista = '';
        // // json.forEach(el => {
        // //   console.log(el);
        lista += '<label>Clave expediente</label>';
        lista += '<p>' + json.uuid + '</p>';
        lista += '<label>Nombre</label>';
        lista += '<p>' + json.nombre + '</p>';
        lista += '<label>Tipo de sangre</label>';
        lista += '<p>' + json.sangre + '</p>';
        lista += '<label>Última Consulta</label>';
        lista += '<p>' + json.ultimaConsulta + '</p>';
        lista += '<label>Fecha de creación</label>';
        lista += '<p>' + json.createdAt + '</p>';
        // // });
        // console.log(response);
        expedientes.innerHTML = lista;
        //   console.log(json);
      } else {
        alert('HTTP-Error: ' + response.status);
      }
    } catch (error) {
      console.error(error.message);
      alert('No pudo realizarse la consulta');
    }
  }

  // Access the form element...
  const form = document.getElementById('myForm');

  // ...and take over its submit event.
  form.addEventListener('submit', function(event) {
    event.preventDefault();

    sendData();
  });

  const formBuscar = document.getElementById('buscar');
  formBuscar.addEventListener('submit', async function(event) {
    event.preventDefault();

    await buscarData();
  });

  const mostrar = document.getElementById('show');
  mostrar.addEventListener('click', async function(event) {
    await listarUUIDS();
  });
});
