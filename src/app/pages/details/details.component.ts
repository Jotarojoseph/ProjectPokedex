

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';

import { PokeapiService } from './../../service/pokeapi.service';
@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  private urlPokemon: string = 'https://pokeapi.co/api/v2/pokemon'
  private urlName: string = 'https://pokeapi.co/api/v2/pokemon-species'

  public isLoading: boolean = false;
  public pokemon: any;
  public apiError: boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private pokeapiService: PokeapiService,
  ) { }

  ngOnInit(): void {
    this.getPokemon;
  }

  get getPokemon() {
    const id = this.activedRoute.snapshot.params['id'];
    const pokemon = this.pokeapiService.apiGetPokemons(`${this.urlPokemon}/${id}`);
    const name = this.pokeapiService.apiGetPokemons(`${this.urlName}/${id}`);

    return forkJoin([pokemon, name]).subscribe(
      res => {
        this.pokemon = res;
        this.isLoading = true;
      },
      error => {
        this.apiError = true;
      }
    );
  }

}
