import React, { Component } from "react";
import ItemList from "../item-list/item-list";
import PersonDetails from "../person-details";
import SwapiService from "../../services/swapi-service";

export default class PeoplePage extends Component {
    swapiService = new SwapiService();
    state = {
        selectedPerson: 3
    }
    onPersonSelected  = (selectedPerson) => {
        this.setState({ selectedPerson })
    }
    render() {
        return (
            <div className="row mb2">
                <div className="col-md-6">
                <ItemList
                    onItemSelected={this.onPersonSelected}
                    getData={this.swapiService.getAllPeople}/>
                </div>
                <div className="col-md-6">
                <PersonDetails personId={this.state.selectedPerson} />
                </div>
            </div>
        )
        
    }
}