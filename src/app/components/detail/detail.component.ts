import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, tap, mergeMap, switchMap } from 'rxjs/operators';
import { DataService } from '../../services/data.service';
import {
  PokemonDetailedDisplayInfoInterface,
  PokemonDetailedInfo,
  PokemonSpeciesInfoInterface,
} from '../../models/pokemon.interface';
@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  pokemonId!: number;
  pokemonData!: PokemonDetailedInfo;
  speciesInfo!: PokemonSpeciesInfoInterface;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dataService: DataService
  ) { }

  ngOnInit() {
    //https://stackoverflow.com/questions/50705214/how-do-i-get-the-route-parameter-out-of-parammap-and-assign-it-to-a-property
    this.route.paramMap.pipe(
      switchMap((params: ParamMap) =>
        this.dataService.getPokemonDetailedInfoById(params.get('id'))
      )
    ).subscribe((data: [PokemonDetailedDisplayInfoInterface, PokemonSpeciesInfoInterface]) => {
        this.pokemonData = data[0];
        this.speciesInfo = data[1];
    });
  }

}
