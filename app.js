var aVehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

const agregarVehiculo = () => {
    let marca = document.getElementById("marca").value;
    let modelo = document.getElementById("modelo").value;
    let año = document.getElementById("año").value;
    let costo = document.getElementById("costo").value;
    let placa = document.getElementById("placa").value;

    // VALIDACION
    console.log("hola mundo");
    if (marca.trim() === "" || modelo.trim() === "" || año.trim() === "" || costo.trim() === "" || placa.trim() === "") {
        Swal.fire({ title: "ERROR", text: "Falta llenar campos!!!", icon: "error" });
        return;
    }

    let vehiculo = { marca, modelo, año, costo, placa };
    aVehiculos.push(vehiculo);
    localStorage.setItem("vehiculos", JSON.stringify(aVehiculos));
    limpiarCampos();
    cerrarModal("exampleModal");
    refrescarTabla();
};

const limpiarCampos = () => {
    document.getElementById("marca").value = "";
    document.getElementById("modelo").value = "";
    document.getElementById("año").value = "";
    document.getElementById("costo").value = "";
    document.getElementById("placa").value = "";
};

const refrescarTabla = () => {
    aVehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];
    let tablaHTML = "";
    let index = 0;
    aVehiculos.map(v => {
        tablaHTML += `
        <tr>
            <td>${v.marca}</td>
            <td>${v.modelo}</td>
            <td>${v.año}</td>
            <td>${v.costo}</td>
            <td>${v.placa}</td>
            <td>
    <button class="btn btn-danger" onclick="eliminarVehiculo(${index})"><i class="bi bi-trash"></i></button>
    <button class="btn btn-primary" onclick="editarVehiculo(${index})"><i class="bi bi-pencil"></i></button>
</td>
</tr>
`

index++;
 })
document.getElementById("listaVehiculos").innerHTML = tablaHTML
}

const cerrarModal = (modal) => {
    var myModalEl = document.getElementById(modal);
    var modal2 = bootstrap.Modal.getInstance(myModalEl);
    modal2.hide();
};

const eliminarVehiculo = (index) => {
    aVehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

    const sweet = Swal.mixin({
        customClass: {
            confirmButton: "btn btn-success mx-3",
            denyButton: "btn btn-danger"
        },
        buttonsStyling: false
    });

    sweet.fire({
        title: "¿Estás seguro de eliminar este Vehículo?",
        showDenyButton: true,
        confirmButtonText: "SI",
        denyButtonText: "NO"
    }).then((result) => {
        if (result.isConfirmed) {
            aVehiculos.splice(index, 1);
            localStorage.setItem("vehiculos", JSON.stringify(aVehiculos));
            refrescarTabla();
            Swal.fire("ÉXITO!!", "SE ELIMINÓ CORRECTAMENTE!!", "success");
        }
    });
}


refrescarTabla();
