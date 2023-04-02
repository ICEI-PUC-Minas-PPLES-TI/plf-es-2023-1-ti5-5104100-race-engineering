import Head from 'next/head'
import styles from '../styles/Cadastro.module.css'
import logo from "../imgs/costs_logo.png"
import Image from 'next/image'
export default function cadastroUsuario(){
    return(
        <div>
                <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                </Head>
                
                <div className={styles.body}> 

                <div className={styles.logo}>
                <Image
                src={logo}
                alt="minha logo"
                />
                </div>


                
                

                <form className={styles.form} action="/add" method="POST">

                <div>
                <h1 className={styles.titulo} >Cadastro de  Usuario</h1>
                </div>
                
                    <div>
                        <p>Email :</p>  
                        <input required type="text" placeholder='insira seu email' name='email'></input>
                    </div>
                    <br/>

                    <div>
                        <p>Senha :</p>  
                        <input required type="password" placeholder='insira sua senha' name='password'></input>
                    </div>
                    <br/>
                    
                    <div>
                    <label htmlFor="usuarios">Tipo de Usuario:</label>
                    <br/>
                    <select  name="usuarios" id="usuarios"  className={styles.selecionar}>
                        <option value="analista"> Analista</option>
                        <option value="mecanico"> Mecanico</option>
                        <option value="piloto" > Piloto</option>
                    </select>
                    </div>
                    <br/>
                    
                
                    <div>
                    <input type="submit" value='CRIAR CONTA' className={styles.botaoinput}></input>
                    <a href='#'><button className={styles.botao}>FAZER LOGIN</button> </a>
                    </div>

        
                </form>
            </div> 
        </div>
    )
}