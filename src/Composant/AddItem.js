import React, {useState} from "react";
import {Card} from "@material-ui/core";
import {CardContent} from "@material-ui/core";
import {Typography} from "@material-ui/core";
import {TextField} from "@material-ui/core";
import {CardActions} from "@material-ui/core";
import {Button} from "@material-ui/core";
import "../App.css";
import {DataStore} from "@aws-amplify/datastore";
import {Item} from "../models";

const AddItem = ({currentUser}) => {
    /* champ utile pour Item schemaGraphQL */
    const [title,setItemTitle] = useState("");
    const [description,setItemDescription] = useState("");
    const [price,setItemPrice] = useState("");

    return <Card className="Add-Item">
        <CardContent>
            <Typography variant="h6">Ajouter un objet</Typography>

            <TextField id={"title"} label={"title"} onChange={event => setItemTitle(event.target.value)} fullWidth/>
            <TextField id={"price"} label={"price"} onChange={event => setItemPrice(event.target.value)} fullWidth/>
            <TextField id={"description"} label={"description"} onChange={event => setItemDescription(event.target.value)} fullWidth/>
        </CardContent>
        <CardActions>
            <Button color="primary" onClick={async () => {
                await DataStore.save(new Item({
                    title,
                    description,
                    price,
                    userEmail:currentUser.attributes.email
                }))
            }}>Publier</Button>
        </CardActions>
    </Card>
}
export default AddItem;
