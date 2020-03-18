import React, {useState, useEffect} from 'react';
import { useMedia } from "react-use";
import{doGet, doDownload} from '../../utils/network'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Image from '@material-ui/icons/Image';
import PictureAsPdf from '@material-ui/icons/PictureAsPdf';
import AttachFile from '@material-ui/icons/AttachFile';
import LinkIcon from '@material-ui/icons/Link';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import DebouncedTextField from '../../components/DebouncedTextField'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import ListItem from '@material-ui/core/ListItem';



const  Download = (props) => {  
  const largeScreen = useMedia('(min-width: 1024px)')
  const [selectedMapel, setSelectedMapel] = useState({})
  const [dataMateri, setDataMateri] = useState([])
  const [filteredMapel, setFilteredMapel] = useState([])
  const [filteredMateri, setFilteredMateri] = useState([])
  const [loadingMateri, setLoadingMateri] = useState(false)
  const [firstLoad, setFirstLoading] = useState(true)
  const [mapelKey, setMapelKey] = useState("")
  const [materiKey, setMateriKey] = useState("")

  const classes = useStyles();
 
  
  useEffect(() => {
    setFilteredMapel(props.dataMapel)
}, [props.dataMapel])
  
useEffect(() => {
    setFilteredMateri(dataMateri)
}, [dataMateri])


  useEffect(() => {
      if(selectedMapel.id_mapel){
        const getDataMateri = async() =>{
            setLoadingMateri(true)
            const params={
                
            }
            const headers={
              Authorization:props.user.token
            }
            const response = await doGet(`materi_online/Materi_online/get_materi_online/${props.user.id_jenjang}/${props.user.id_kelas}/${selectedMapel.id_mapel}/${props.user.id_jurusan}`,params,headers)      
            setDataMateri(response.data)      
            setLoadingMateri(false)
        }
        getDataMateri()
        setFirstLoading(false)       
      }    
    }, [selectedMapel,props.user.id_jenjang,props.user.id_kelas,props.user.id_jurusan,props.user.token])

    useEffect(() => {
        setFilteredMapel(props.dataMapel.filter(mapel=>(mapel.nama_mapel.toLowerCase().includes(mapelKey.toLowerCase()))))
    }, [mapelKey,props.dataMapel])

    useEffect(() => {
        setFilteredMateri(dataMateri.filter(materi=>(materi.judul.toLowerCase().includes(materiKey.toLowerCase()))))
    }, [materiKey,dataMateri])

  
  

  const download=(materi)=>{
      if(materi.type==="link"){
        window.open(materi.url, "_blank")
      }else{
        doDownload(materi.url,{},materi.file_name)
      }
    
  }  





const getIconByType=(type)=>{
    switch (type) {
        case "image":            
            return <Image/>
        case "pdf":            
            return <PictureAsPdf/> 
        case "link":            
            return <LinkIcon/>                
        default:
            return <AttachFile/>                
    }
}
 

  

  return(
      <>
    {
        props.dataMapel && 
        <Grid container className={largeScreen? classes.tab_content_large:classes.tab_content_small}>
            <Grid item xs={12} md={3} className={largeScreen? classes.mapel_container_large : classes.mapel_container_small}>
                <Grid container  alignItems="center" justify="center" className={largeScreen? classes.mapel_header_large:classes.mapel_header_small}>Pelajaran</Grid>
                <Grid container  alignItems="center" justify="center" className={classes.search_container}>
                    <DebouncedTextField
                        label="cari pelajaran"
                        variant="outlined"
                        size="small" 
                        value={mapelKey}
                        onChange={setMapelKey}
                        fullWidth
                        />    
                </Grid>
                
                <Grid container  className={largeScreen===true?classes.mapel_content_large:classes.mapel_content_small} >
                    <List component="nav" className={classes.mapel_list}>
                        {
                            props.dataMapel.length===0 && 
                            <Grid container justify="center"> 
                                <Typography component="h1" variant="h5">
                                    tidak ada data pelajaran
                                </Typography>
                            </Grid>
                        }
                        {
                            filteredMapel.map(mapel=>(
                                <ListItem key={mapel.id_mapel} button selected={mapel.id_mapel===selectedMapel.id_mapel} onClick={()=>setSelectedMapel(mapel)}>
                                    <ListItemText primary={mapel.nama_mapel} />
                                </ListItem>
                            ))
                        }                        
                    </List>
                </Grid>
                
            </Grid>

            <Grid item xs={12} md={9} className={largeScreen? classes.materi_container_large:classes.materi_container_small}>
                <Grid container alignItems="center" justify="center"  className={largeScreen? classes.materi_header_large:classes.materi_header_small} >Materi</Grid>
                <Grid container  alignItems="center" justify="flex-end" className={classes.search_container}>
                    <Grid item xs={12} md={4}>
                        <DebouncedTextField
                            label="cari materi"
                            variant="outlined"
                            size="small" 
                            value={materiKey}
                            onChange={setMateriKey}
                            fullWidth
                            />    
                    </Grid>
                    
                </Grid>
                <Grid container  justify="center" className={classes.materi_content} >

                        {
                            loadingMateri && <CircularProgress />
                        }

                        {
                            loadingMateri===false && firstLoad === true &&
                            <Grid container justify="center"> 
                                <Typography component="h1" variant="h5">
                                    mohon pilih mata pelajaran
                                </Typography>
                            </Grid>
                        }

                        {
                            loadingMateri===false && dataMateri.length===0 &&  firstLoad ===false &&
                            <Grid container justify="center"> 
                                <Typography component="h1" variant="h5">
                                    belum ada materi 
                                </Typography>
                            </Grid>
                        }
                    <List component="nav" className={classes.materi_list} >    
                        {  loadingMateri===false &&  
                            filteredMateri.map(materi=>(
                                
                                <ListItem key={materi.id_materi}>
                                    <ListItemAvatar>
                                    <Avatar>
                                        {getIconByType(materi.type)}
                                    </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText primary={materi.judul} />
                                    <Hidden smDown>
                                        <ListItemText>
                                            <Chip size="small" label={materi.type} />
                                        </ListItemText>                                        
                                    </Hidden>
                                    
                                    
                                    {materi.url &&
                                        <ListItemSecondaryAction>
                                            <Tooltip title="unduh materi">
                                                <IconButton onClick={()=>download(materi)} edge="end" aria-label="download">
                                                    <SaveAlt />
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    }
                                    
                                </ListItem>                            
                                
                                
                            ))
                        }                        
                    </List> 
                </Grid>                
            </Grid>
        </Grid>
    }
    </>
  
  )
  
  
}

const useStyles = makeStyles(theme => ({
    root:{
        padding:16
        
    },
    tab:{
        fontSize:20,
        fontWeight:'bold'
    },
    tab_content_large:{
        marginTop:16,
        height:550,        
        border:"1px solid #e0e0e0",
        borderRadius:4,
        paddingBottom:16
    },
    tab_content_small:{
        marginTop:16,
        height:550,                
    },
    mapel_container_large: {
        marginBottom:16,
        borderRight:"1px solid #e0e0e0",
    },
    mapel_container_small: {
        marginBottom:16,   
        border:"1px solid #e0e0e0", 
        borderRadius:4,    
    },
    mapel_content_large:{        
        height:450,
        overflowY:"auto"
    },
    mapel_content_small:{        
        height:200,
        overflowY:"auto"
    },
    mapel_list: {
        width:'100%'
    },
    materi_container_large: {
        marginBottom:16
    },
    materi_container_small: {
        marginBottom:16,
        border:"1px solid #e0e0e0", 
        borderRadius:4,    
    },
    mapel_header_large:{
        height:50,
        borderTopLeftRadius:4,
        backgroundColor:"#396afc",
        color:"#ffffff",
        fontWeight:'bold'  
    },
    mapel_header_small:{
        height:50,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        backgroundColor:"#396afc",
        color:"#ffffff",
        fontWeight:'bold'  
    },
    materi_header_large:{
        height:50,
        borderTopRightRadius:4,
        backgroundColor:"#396afc",
        color:"#ffffff"  ,
        fontWeight:'bold'  
    },
    materi_header_small:{
        height:50,
        borderTopLeftRadius:4,
        borderTopRightRadius:4,
        backgroundColor:"#396afc",
        color:"#ffffff"  ,
        fontWeight:'bold'  
    },
    materi_content:{
        height:450,
        overflowY:"auto"
    },
    materi_list:{
        width:'100%'
    },
    bold:{
        color:"#ffffff"  ,
        fontWeight:'bold'
    },
    search_container:{
        height:50,
        padding:8
    },
    hide:{
        display:'none'
    }
    
  }));

export default Download;
