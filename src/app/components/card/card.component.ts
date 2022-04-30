import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { DataService } from '../../services/data.service';
import { PokemonListDisplayInfoInterface } from '../../models/pokemon.interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  pokemons$!: Observable<PokemonListDisplayInfoInterface[]>;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.pokemons$ = this.dataService.getPokemons();
  }

}
