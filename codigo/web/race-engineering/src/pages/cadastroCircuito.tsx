import Head from "next/head";
import Image from "next/image";

import logo from "../imgs/costs_logo.png";
import styles from "../styles/Cadastro.module.css";

export default function cadastroCircuito() {
  return (
    <div>
      <Head>
        <title>Cadastro Circuito</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={styles.body}>
        <div className={styles.logo}>
          <Image src={logo} alt="minha logo" />
        </div>

        <form className={styles.form} action="/create-circuit" method="POST">
          <div>
            <h1 className={styles.titulo}>Cadastrar Circuito</h1>
          </div>

          <div>
            <p>Tipo de Circuito :</p>
            <select name="circuito" id="circuito" className={styles.selecionar}>
              <option value="select"> Select</option>
              <option value="circuito1"> Circuito1</option>
              <option value="circuito2"> Circuito2</option>
              <option value="circuito3"> Circuito3</option>
            </select>
          </div>
          <br />

          <div>
            <input
              required
              type="number"
              placeholder="Numero de Voltas"
            ></input>
          </div>
          <br />
          <br />

          <div>
            <input
              type="submit"
              value="Avançar"
              className={styles.botaoinput}
            ></input>
          </div>
        </form>
      </div>
    </div>
  );
}
