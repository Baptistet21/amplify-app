import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import {CardContent} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import "../App.css";
import {DataStore} from "@aws-amplify/datastore";
import {Item} from "../models";
import {AmplifyS3Image} from "@aws-amplify/ui-react";


const Items = () => {
    /* list items*/
    const [items, setItems] = useState([]);

    const getItems = async ()=> setItems(await DataStore.query(Item))

    useEffect(()=>{
        /* permet de raffraichir, modifier la list par rapport au ajout et supp*/
        getItems();
        const subscription = DataStore.observe(Item).subscribe(()=>getItems())
        return ()=> subscription.unsubscribe();
    })


    return <div>
        {items.length === 0 &&
            <Typography style={{textAlign:"center"}} variant="h6">Aucune annonce</Typography>}
        {items.map(item =>
            <Card key={item.id} className="Item">
                <CardContent>
                    <Typography variant="h6">{item.title}</Typography>
                    <Typography style={{float:"right"}}>Prix : {item.price}€</Typography>
                    <Typography>{item.description}</Typography>
                    {item.picture && <AmplifyS3Image path={item.picture}/>}
                    <Typography style={{textAlign:"right"}}>Publié par {item.userEmail}</Typography>

                </CardContent>
            </Card>)}

    </div>
}

export default Items;