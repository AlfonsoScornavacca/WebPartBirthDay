import * as React  from 'react';
import { useState, useEffect } from 'react';
import styles from './Birthday.module.scss';
import { IBirthdayProps } from './IBirthdayProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react';
import { PeoplePickerItem } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react';
import { Label } from 'office-ui-fabric-react';
import { Web, IWeb} from '@pnp/sp/presets/all';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { PrimaryButton } from 'office-ui-fabric-react';
import { List, Lists } from '@pnp/sp/lists';
import {
  SPHttpClient,
  SPHttpClientResponse
} from '@microsoft/sp-http';
import { ISPList  } from '../BirthdayWebPart';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import BirthdayWebPart from '../BirthdayWebPart';
import { _Lists } from '@pnp/sp/lists/types';
//import { SPInit } from '@pnp/sp';
import * as _ from 'lodash';
import { SPService } from '../../../services/SPService';




export interface IStates{
  Items: any;
  ID: any;
  EmployeeNameId: any;
  HireData: any;
  JobDescription: any;
  HTML: any;
}

  export  const Birthday: React.FC<IBirthdayProps> = (props) => {
    
    const service: SPService = new SPService(props.context); 

    const [item, setItem] = React.useState<boolean>(false);
    const estado = () =>{
      if(escape(props.userDisplayName)=='Nombre de Ejemplo'){
        setItem(!item);
      }    
    }
    useEffect(()=>{
      (async () => {
        let userItems = await service.getCurrentUserListItems();
        console.log(userItems);
      })
    }, [])
    const obtenerDatos =  () => {
      console.log('Hola '+ escape(props.userDisplayName));
    }
    return (
      <section className={`${styles.birthday} ${props.hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <h2>Holaa, {escape(props.userDisplayName)}!</h2>
          <p>Queremos desearte un feliz cumpleaños!!!</p>
        </div>
        <div className={styles.contenedor}>
          <div className={item === false ? styles.modal : ''}>
          <iframe width="560" height="315" src="https://www.youtube.com/embed/sigge8kJ9wg" title="YouTube video player"  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <button onClick={estado}>Estado</button>
        </div>
      </section>
    );
  }
function useBoolean(arg0: boolean): [any, { setTrue: any; setFalse: any; }] {
  throw new Error('Function not implemented.');
}

