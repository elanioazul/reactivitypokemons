import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { mergeMap } from 'rxjs/operators';

import { Pokedex, Result } from '../models/generic.interface';
import {
  Pokemon,
  PokemonDetailedDisplayInfoInterface,
  PokemonListDisplayInfoInterface,
  POKEMON_IDS,
} from '../models/pokemon.interface';
import { PokemonSpecies } from '../models/specie.interface';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  //Methods for frame (pokemon list) component

  // v1
  // getPokemons() {
  //   const pokemons = POKEMON_IDS.map((id) => this.getPokemonById(id));
  //   return forkJoin(pokemons);
  // }

  // v2
  getPokemons() {
    return this.http.get<Pokedex>(this.baseUrl).pipe(
      map((pokedex: Pokedex) => pokedex.results),
      mergeMap((results: Result[]) =>
      forkJoin(results.map((result) => this.getPokemonByUrl(result.url)))
      )
    );
  }

  getPokemonById(id: number): Observable<PokemonListDisplayInfoInterface> {
    return this.http.get<Pokemon>(this.baseUrl + `/${id}`).pipe(
      map((data: Pokemon) => {
        const imageUrl = data.sprites.front_default;
        const id = data.id;
        const type = data.types[0].type.name;
        const name = data.name;

        return { id, name, imageUrl, type };
      })
    );
  }

  getPokemonByUrl(url: string): Observable<PokemonListDisplayInfoInterface> {
    return this.http.get<Pokemon>(url).pipe(
      map((data: Pokemon) => {
        const imageUrl = data.sprites.front_default;
        const id = data.id;
        const type = data.types[0].type.name;
        const name = data.name;

        return { id, name, imageUrl, type };
      })
    );
  }


  //Methods for detail component (pokemon details)

  getPokemonDetailedInfoById(id: string | null) {
    const pokemonInfo = this.getPokemonDetailById(id);
    const speciesInfo = this.getPokemonSpeciesInfoById(id);
    return forkJoin([pokemonInfo, speciesInfo]);
  }

  getPokemonDetailById(id: string | null) {
    return this.http.get<Pokemon>(this.baseUrl + `/${id}`).pipe(
      map((data: Pokemon) => {
        const { id, name, sprites, stats, types, weight, height } = data;
        const detailedInfo: PokemonDetailedDisplayInfoInterface = {
          id,
          name,
          height,
          weight,
          imageUrl: sprites.other.dream_world.front_default,
          type: types[0].type?.name,
        };
        return detailedInfo;
      })
    );
  }

  getPokemonSpeciesInfoById(id: string | null) {
    return this.http.get<PokemonSpecies>(this.baseUrl + `-species/${id}`).pipe(
      map((data: PokemonSpecies) => {
        const { habitat, flavor_text_entries } = data;
        const habitatText = habitat.name;
        const decriptiveText = flavor_text_entries[0].flavor_text.replace(
          /\f/g,
          ' '
        );
        return { habitat: habitatText, description: decriptiveText };
      })
    );
  }
}
