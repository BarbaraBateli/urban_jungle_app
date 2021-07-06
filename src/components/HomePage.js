import axios from "axios";
import React, { Component } from "react";
import { Link } from "react-router-dom";

//import PlantCard from "./PlantCard";

class HomePage extends Component {
  state = {
    categoriaPlantas: [],
    cadaCategoria: [],
  };

  componentDidMount = async () => {
    try {
      const response = await axios.get(
        "https://ironrest.herokuapp.com/1-urban-jungle"
      );

      //console.log(response.data);

      this.setState({ categoriaPlantas: [...response.data] });
      this.getCategorias();
    } catch (err) {
      console.log(err);
    }
  };

  getCategorias = () => {
    let mapPlantas = this.state.categoriaPlantas.map((planta) => {
      return planta.categoria;
    });

    let categoriaUnica = [...new Set(mapPlantas)].map((categoriaUnica) => {
      return {
        categoria: categoriaUnica,
        imagem: this.state.categoriaPlantas.find(
          (planta) => planta.categoria === categoriaUnica
        ).imagem,
      };
    });

    this.setState({ cadaCategoria: categoriaUnica });
  };

  render() {
    // console.log(this.state.cadaCategoria);
    return (
      <div className="container mb-1 cards-plantas ">
        <div>
          <img
            src="https://imagens-revista.vivadecora.com.br/uploads/2018/05/tipos-de-flores-ant%C3%BArio.jpg"
            className="bg-imagem-home"
            alt="..."
          />{" "}
        </div>
        <div className="row row-cols-2">
          {this.state.cadaCategoria.map((planta) => {
            return (
              <div className="card col">
                <Link
                  className="links"
                  to={`/${planta.categoria}`}
                  key={planta._id}
                >
                  <img
                    src={planta.imagem}
                    className="card-img-top mt-3"
                    alt="..."
                    style={{ width: "35vw", height: "15vh" }}
                  />
                  <div className="card-body">
                    <h4 className="card-title">{planta.categoria}</h4>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>{" "}
      </div>
    );
  }
}

export default HomePage;
