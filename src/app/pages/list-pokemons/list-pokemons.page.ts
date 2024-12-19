import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, NavParams } from '@ionic/angular';
import { Pokemon } from 'src/app/models/pokemon';
import { PokemonService } from 'src/app/services/pokemon.service';

@Component({
  selector: 'app-list-pokemons',
  templateUrl: './list-pokemons.page.html',
  styleUrls: ['./list-pokemons.page.scss'],
})
export class ListPokemonsPage implements OnInit {

  public pokemons: Pokemon[] = [];
  
  constructor(
    private pokemonService: PokemonService,
    private loadingController: LoadingController,
    private navParams: NavParams,
    private navController: NavController
  ) { }

  ngOnInit() {
    this.morePokemon();
  }

  morePokemon($event = null){
    const promise = this.pokemonService.getPorkemons();

    if(promise){

      let loading = null;
      if (!$event) {
        loading = this.loadingController.create({
          message: 'Loading...'
        });
        loading.then( (res) => {
          res.present();
        });
      }

      promise.then((results) => {
        this.pokemons = this.pokemons.concat(results);
        if ($event) {
          $event.target.complete();
        }
        loading.then( (res) => {
          res.dismiss();
        });
      }).catch( (err) => {
        if ($event) {
          $event.target.complete();
        }
      });

    }
  }

  goToPokemon(pokemon: Pokemon){
    this.navParams.data["pokemon"] = pokemon;
    this.navController.navigateForward('/detail-pokemon');
  }

}
