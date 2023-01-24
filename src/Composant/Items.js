import React, {useEffect, useState} from "react";
import {Card} from "@material-ui/core";
import {CardContent} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import "../App.css";
import {DataStore} from "@aws-amplify/datastore";
import {Item} from "../models";


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
                    <Typography style={{float:"right"}}>Prix : {item.title}</Typography>
                    <Typography>{item.description}</Typography>
                    <Typography style={{textAlign:"right"}}>Publié par {item.userEmail} le {item.createdAt}</Typography>

                </CardContent>
            </Card>)}

    </div>
}

export default Items;