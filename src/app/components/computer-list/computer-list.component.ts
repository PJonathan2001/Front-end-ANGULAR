import { Component,AfterViewInit, ViewChild } from '@angular/core';
import { ComputerService } from 'src/app/services/computer.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { IComputer } from 'src/app/models/IComputer';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.css']
})
export class ComputerListComponent implements AfterViewInit {
  computers:IComputer[] = [];
  displayedColumns: string[] = ['numerador','_id', 'procesador', 'pantalla', 'ram', 'rom', 'anio_lanzamiento', 'acciones'];
  dataSource: any = new MatTableDataSource([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private computerService: ComputerService) {
    this.getComputers();
   }

   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getComputers() {
    this.computerService.getComputers().subscribe(
      res => {
        this.computers = res.content;
        this.dataSource.data = this.computers;
      },
      err => console.log(err)
    );
  }
  deleteComputer(id: string) {
    this.computerService.deleteComputer(id).subscribe(
      res => {
        console.log(res);
        this.getComputers();
      }
    );
  }
}
