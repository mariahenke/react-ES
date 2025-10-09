import './style.css'

function Home() {
  

  return (
    
      <div className='container'>
        <form>
          <h1>Seja bem-vindo!</h1>
          <h4>Faça seu cadastro</h4>
          <input placeholder="Nome" name="nome" type='text' />
          <input placeholder="Email" name ="email" type='email' />
          <button type='button'>Registrar</button>
        </form>

        <div className="wave"></div>
       
      </div>
     
  )
}

export default Home
