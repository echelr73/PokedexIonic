import { Component, OnInit } from '@angular/core';
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
    private pokemonService: PokemonService
  ) { }

  ngOnInit() {
    this.motePokemon();
  }

  motePokemon(){
    const promise = this.pokemonService.getPorkemons();

    if(promise){
      promise.then((results) => {
        console.log(results);
        this.pokemons = this.pokemons.concat(results);
        console.log(this.pokemons);
      });

    }
  }

}
