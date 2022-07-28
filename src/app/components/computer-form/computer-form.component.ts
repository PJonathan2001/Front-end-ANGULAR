import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IComputer } from 'src/app/models/IComputer';
import { ComputerService } from 'src/app/services/computer.service';

@Component({
  selector: 'app-computer-form',
  templateUrl: './computer-form.component.html',
  styleUrls: ['./computer-form.component.css']
})
export class ComputerFormComponent implements OnInit {
  computer: IComputer = {
    _id: '',
    procesador : null,
    pantalla : null,
    ram : null,
    rom : null,
    anio_lanzamiento : null
  }
  constructor(private computerService : ComputerService, private router : Router, private route : ActivatedRoute) {

  }
  edit: boolean = false;
  computers : number;
  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params["id"]) {
      this.computerService.getComputer(params["id"]).subscribe(
        res => {
          this.computer = res.content;
          this.edit = true;
        }
      );
    }
  }
  saveComputer() {
  this.computer.numerador = this.computers + 1;
    delete this.computer._id;
    console.log(this.computer);
    this.computerService.saveComputer(this.computer).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/list']);
      },
      err => console.log(err)
    );
  }

  editComputer() {
    console.log(this.computer);
    this.computerService.updateComputer(this.computer).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['/list']);
     },
      err => console.log(err)
    );
  }

}
