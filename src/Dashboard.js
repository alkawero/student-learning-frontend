import React, {useState} from 'react';

const  Dashboard = () => {

  const [nama, setNama] = useState("")

  const [dataNama, setDataNama] = useState([])

  const rubahNama = (e) =>{
    setNama(e.target.value)
  }

  const tambahDataNama = ()=>{        
    setDataNama([...dataNama, nama])
    setNama("")
  }

  
  return (
    <div>
      <input type="text" value={nama} onChange={rubahNama}/>
      <button onClick={tambahDataNama}>tambah nama</button>

      <br/>      

      { dataNama.map(nama => (<p>{nama}</p>)) }
      
    </div>
  );
}

export default Dashboard;
