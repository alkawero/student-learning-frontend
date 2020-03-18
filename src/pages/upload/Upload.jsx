import React,{useState, useEffect} from 'react';
import Select from 'react-select';
import{doGet, doUpload} from '../../utils/network'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/Done';
import Refresh from '@material-ui/icons/Refresh';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import Chip from '@material-ui/core/Chip';


const Upload= (props)=> {
    const classes = useStyles()
    const [mapelOptions, setMapelOptions] = useState([])
    const [materiOptions, setMateriOptions] = useState([])
    const [dataTugas, setDataTugas] = useState([])    
    const [selectedMateri, setSelectedMateri] = useState(null)
    const [selectedMapel, setSelectedMapel] = useState(null)
    const [selectedFile, setSelectedFile] = useState(null)
    const [uploadDone, setUploadDone] = useState(false)
    const [uploading, setUploading] = useState(false)

    const fileChange=(e)=>{         
        setSelectedFile(e.target.files[0]) 
    }

    const uploadAgain = () => {        
        setUploadDone(false)
      };

    const upload = async () => {
        if(selectedFile!==null && selectedMapel!==null && selectedMateri!==null){
            setUploading(true)
            let formData = new FormData();
            formData.set('id_materi', selectedMateri.value)
            formData.set('niy', props.user.niy)
            formData.append("files", selectedFile);
            const headers={
                'content-type': 'multipart/form-data' ,
                Authorization:props.user.token
            }
            const url = await doUpload("materi_online/Materi_online/post_tugas", formData,headers);                
            setUploading(false)
            setUploadDone(true)
            setSelectedFile(null);
            getDataTugas()
        }
      };

      const selectMapelChange= async(e)=>{
        setSelectedMateri(null)
        setSelectedMapel(e)
        const response = await props.getDataMateri(props.user.id_jenjang, props.user.id_kelas, e.value,props.user.id_jurusan)
        if(response){
            const materiOptions = response.data.map(data=>({value:data.id_materi, label:data.judul}))
            setMateriOptions(materiOptions)
        }
        
      }

      const selectMateriChange= async(e)=>{
        setSelectedMateri(e)
      }

      const getDataTugas = async() =>{
        const params={            
         
        }
        const headers={
          Authorization:props.user.token
        }
        const response = await doGet(`materi_online/Materi_online/get_tugas_online/${props.user.niy}`,params,headers)      
        setDataTugas(response.data)  
    }
      

      useEffect(() => {
        if(props.dataMapel){
            setMapelOptions(props.dataMapel.map(mapel=>({value:mapel.id_mapel, label:mapel.nama_mapel})))
        }
        }, [props.dataMapel]) 
        
        
      useEffect(() => {
        if(props.user){
            getDataTugas()
        }
        }, [props.user]) 

return(
    <>
    <Grid container className={classes.root}>
        <Grid container justify="center" alignItems="center" className={classes.header_container}>Unggah Tugas</Grid>
        <Grid container spacing={1} className={classes.content_container}>
            <Grid item xs={12} md={3} style={{marginTop:8}}>
                <Select
                isClearable={true}
                name="mapel"                
                options={mapelOptions}
                onChange={selectMapelChange}
                value={selectedMapel}
                placeholder="Pilih pelajaran"
                />
            </Grid>
            <Grid item xs={12} md={4} style={{marginTop:8}}>
                <Select
                isClearable={true}
                name="materi"                
                options={materiOptions}
                onChange={selectMateriChange}
                value={selectedMateri}
                placeholder="Pilih tugas"
                />
            </Grid>
            <Grid container justify="flex-start" alignItems="center" item xs={12} sm={4} style={{marginTop:8}}>
                <Grid container alignItems="center" className={classes.file_container}>                 
                    <input type="file" onChange={fileChange} />
                </Grid>
            </Grid>
            <Grid item container justify="space-between" alignItems="center" xs={12} md={1} style={{marginTop:8}}>
                {uploading===true && <span>uploading...</span>}
                {uploading===false&&uploadDone===false && <Button onClick={upload} variant="contained" color="primary">kirim</Button>}
                {uploadDone===true && 
                <>
                    
                    <IconButton size="small" onClick={uploadAgain}>
                        <Done />
                    </IconButton>
                    <IconButton size="small" onClick={uploadAgain}>
                        <Refresh />
                    </IconButton>
                </>
                }
            </Grid>
        </Grid>

        

    </Grid>

    <Grid container className={classes.root}>
        <Grid container justify="center" alignItems="center" className={classes.header_container}>
            <Grid item xs={2}></Grid>
            <Grid item xs={8} container justify="center" alignItems="center">Daftar Tugas Terkirim</Grid>
            <Grid item xs={2} container justify="flex-end" alignItems="center">
                <IconButton onClick={getDataTugas}>
                    <Refresh style={{color:"#ffffff"}}/>
                </IconButton>
            </Grid>
        </Grid>
        <Grid container className={classes.content_container}>
        <List component="nav" className={classes.tugas_list}>
                        {
                            dataTugas.length===0 && 
                            <Grid container justify="center"> 
                                <Typography component="h1" variant="h5">
                                    belum ada data tugas terkirim
                                </Typography>
                            </Grid>
                        }
                        {
                            dataTugas.map(tugas=>(
                                <ListItem key={tugas.id_mapel} button >
                                    <ListItemText primary={tugas.judul} secondary={tugas.nama_mapel}/>
                                    <ListItemText>
                                            <Chip size="small" label={tugas.name_status} />
                                    </ListItemText> 
                                </ListItem>
                            ))
                        }                        
                    </List>
        </Grid>
    </Grid>
    </>
)    
}

const useStyles = makeStyles(theme => ({
    root:{
        marginTop:16,
        border:"1px solid #e0e0e0", 
        borderRadius:4,        
    },    
    bold:{
        color:"#ffffff"  ,
        fontWeight:'bold'
    },
    hide:{
        display:'none'
    },
    header_container:{
        height:50,
        backgroundColor:"#396afc",
        borderTopLeftRadius:4,
        borderTopRightRadius:4, 
        color:"#ffffff",
        fontWeight:'bold'
    },
    content_container:{
        paddingLeft:8,
        paddingRight:8,
        paddingBottom:8
    },
    file_container:{
        height:36,
        border:"1px solid #e0e0e0",
        borderRadius:4,
        paddingLeft:8,
        color:"#9898a4"
    },
    tugas_list:{
        width:'100%'
    }
    
    
  }));


export default Upload;