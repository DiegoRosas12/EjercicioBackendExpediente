window.addEventListener('load', function() {
  function sendData() {
    const XHR = new XMLHttpRequest();

    // Bind the FormData object and the form element
    const FD = new FormData(form);

    // Define what happens on successful data submission
    XHR.addEventListener('load', function(event) {
      alert(event.target.responseText);
    });

    // Define what happens in case of error
    XHR.addEventListener('error', function(event) {
      alert('No pudo enviarse el expediente');
    });

    // Set up our request
    XHR.open('POST', 'https://localhost:5000/api');

    // The data sent is what the user provided in the form
    XHR.send(FD);
  }

  async function listarUUIDS() {
    try {
      let uuid = document.getElementById('uuid').value;

      let response = await fetch('http://localhost:5000/api/' + uuid, {
        headers: {
          'Access-Control-Allow-Origin': '*'
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
          'Access-Control-Allow-Origin': '*'
        }
      });
      let expedientes = document.getElementById('expedientes');
      if (response.ok) {
        // if HTTP-status is 200-299
        // get the response body (the method explained below)
        let json = await response.json();
        let lista = '';
        // json.forEach(el => {
        //   console.log(el);
        lista += '<label>Clave expediente</label>';
        lista += '<p>' + response.uuid + '</p>';
        lista += '<label>Nombre</label>';
        lista += '<p>' + response.nombre + '</p>';
        lista += '<label>Tipo de sangre</label>';
        lista += '<p>' + response.sangre + '</p>';
        lista += '<label>Última Consulta</label>';
        lista += '<p>' + response.ultimaConsulta + '</p>';
        lista += '<label>Fecha de creación</label>';
        lista += '<p>' + response.createdAt + '</p>';
        // });
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
