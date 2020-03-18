import React, {useState} from 'react';
import{doGet} from '../../utils/network'
import {    
    Switch,
    Route    
  } from "react-router-dom";
import clsx from 'clsx';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import CloudUpload from '@material-ui/icons/CloudUpload';
import CloudDownload from '@material-ui/icons/CloudDownload';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Download from '../download/Download'
import Upload from '../upload/Upload'
import { useHistory } from "react-router-dom";
import ListItemText  from '@material-ui/core/ListItemText';


const  Home = (props) => {  
    let history = useHistory();

  //const url = "http:localhost:3000/";  
  //const url_path = "/materi_pelajaran_test"; 
  const url_path = "/materi-pelajaran";  
  const [openDrawer, setOpenDrawer] = useState(false)
  const classes = useStyles();

  const getDataMateri = async(id_jenjang,id_kelas,id_mapel,id_jurusan) =>{
    const params={        
    }
    const headers={
      Authorization:props.user.token
    }
    return await doGet(`materi_online/Materi_online/get_materi_online/${id_jenjang}/${id_kelas}/${id_mapel}/${id_jurusan}`,params,headers)          
}

    const gotoPage=(path)=>{
        setOpenDrawer(false)
        history.push(path);
    }

  return(
    <Grid container justify="center" className={classes.root}>
        <Grid container>
            <AppBar position="static" style={{borderRadius:4, backgroundColor:'#396afc'}}>
                {
                    props.user &&
                    <Grid container style={{height:50}}> 
                        <Grid item xs={2} md={1} container justify="center" alignItems="center" >
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={()=>setOpenDrawer(true)}
                                edge="start"
                                className={clsx(classes.menuButton, openDrawer && classes.hide)}
                            >
                                <MenuIcon />
                            </IconButton>                  
                        </Grid>
                        
                        <Grid item xs={4} md={2} container justify="center" alignItems="center" className={classes.bold}>
                            {props.user.nama_jenjang+" Kelas "+props.user.nama_kelas}
                        </Grid>
                        <Hidden smDown>
                            <Grid item xs={6} md={8} container justify="center" alignItems="center" className={classes.bold}>                            
                                {props.user.nama_jurusan}
                            </Grid>        
                        </Hidden>                
                        <Grid item xs={6} md={1} container alignItems="center" justify="flex-end">
                            <Hidden smDown>
                                <Button className={classes.bold} onClick={()=>props.doLogout()}>Logout</Button>
                            </Hidden>
                            <Hidden mdUp>
                                <IconButton
                                    color="inherit"
                                    aria-label="logout"
                                    onClick={()=>props.doLogout()}
                                    edge="start"
                                >
                                    <PowerSettingsNew />
                                </IconButton> 
                            </Hidden>
                        </Grid>                    
                    </Grid>   
                }             
            </AppBar>
        </Grid>
        
        <Switch>                
            <Route exact path={url_path}>
                <Download user={props.user} dataMapel={props.dataMapel} />
            </Route>
            <Route exact path={url_path+"/download"}>
                <Download user={props.user} dataMapel={props.dataMapel} />
            </Route>
            <Route path={url_path+"/upload"}>
                <Upload user={props.user} dataMapel={props.dataMapel} getDataMateri={getDataMateri}/>
            </Route>
        </Switch>
            
        
        <Drawer anchor="top" open={openDrawer} onClose={()=>setOpenDrawer(false)}>
            <List>     
                <ListItem button>
                <AppBar position="static" style={{borderRadius:4, backgroundColor:'#396afc'}}>
                {
                    props.user &&
                    <Grid container justify="center" alignItems="center" style={{height:50}} className={classes.bold}>                    
                        Halo, {props.user.nama}
                    </Grid>   
                }             
            </AppBar>
                </ListItem>                            
                <ListItem button onClick={()=>gotoPage(url_path+'/upload')}>
                    <ListItemIcon><CloudUpload /></ListItemIcon>
                    <ListItemText primary="Unggah Tugas"/>                    
                </ListItem>       
                <Divider/>         
                <ListItem button onClick={()=>gotoPage(url_path+'/download')}>
                    <ListItemIcon><CloudDownload  /></ListItemIcon>
                    <ListItemText primary="Unduh Materi"/>                    
                </ListItem> 
            </List>
        </Drawer>
  </Grid>
  )
  
  
}

const useStyles = makeStyles(theme => ({
    root:{
        padding:16
        
    },    
    bold:{
        color:"#ffffff"  ,
        fontWeight:'bold'
    },
    hide:{
        display:'none'
    }
    
  }));

export default Home;
