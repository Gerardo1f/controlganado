import { Component, OnInit } from '@angular/core';
import { VacasService } from 'src/app/vacas/services/vacas.service';
import { Label } from 'ng2-charts';
import { ChartOptions , ChartType , ChartDataSets} from 'chart.js';
 

@Component({
  selector: 'app-reporte-leche',
  templateUrl: './reporte-leche.component.html',
  styleUrls: ['./reporte-leche.component.css']
})
export class ReporteLecheComponent implements OnInit {

  codigoVaca: string = '';
  codigoValid: string = 'Ingresa 8 caracteres';
  fechaIndividual : string = '2022';
  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2017', '2018', '2019', '2020', '2021', '2022'];

  public barChartLabelsMeses: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [ ], label: 'Litros por Año', backgroundColor: '#42B81F', hoverBackgroundColor: '#468533' },
  ];


  public barChartDataMeses: ChartDataSets[] = [
    { data: [ ], label: 'Litros por Mes', backgroundColor: '#42B81F', hoverBackgroundColor: '#468533' },
  ];

  public barChartDataMesesIndividual: ChartDataSets[] = [
    { data: [ ], label: 'Litros por Mes', backgroundColor: '#42B81F', hoverBackgroundColor: '#468533' },
  ];



  constructor( private vacaService : VacasService) { }

  setCodigoVaca(value:string){
    console.log(value);
    this.codigoVaca= value;
  }


  setAno(fecha : string){
    this.vacaService.obtenerReporteMensual(fecha).subscribe( res => {
      this.barChartDataMeses[0].data = [
        res.lecheMens[0].enero,
        res.lecheMens[0].febrero,
        res.lecheMens[0].marzo,
        res.lecheMens[0].abril,
        res.lecheMens[0].mayo,
        res.lecheMens[0].junio,
        res.lecheMens[0].julio,
        res.lecheMens[0].agosto,
        res.lecheMens[0].septiembre,
        res.lecheMens[0].octubre,
        res.lecheMens[0].noviembre,
        res.lecheMens[0].diciembre,


      ];

    });



  }

  setAnoIndividual(fechaIndividual : string){
    this.fechaIndividual = fechaIndividual;

  }
  ngOnInit(): void {
    this.vacaService.pestana= 'Reportes';
    this.setAno('2022');

    this.vacaService.obtenerReporteAnual().subscribe(
      res  => {
        console.log();
        this.barChartData[0].data = [
          res.reporteAnual[0].L_20217,
          res.reporteAnual[0].L_2018,
          res.reporteAnual[0].L_2019,
          res.reporteAnual[0].L_2020,
          res.reporteAnual[0].L_2021,
          res.reporteAnual[0].L_2022,



        ];

      }
    )

  }

  busquedaIndividual(){
    console.log(this.fechaIndividual);
    this.vacaService.obtenerReporteMensualIndividual( this.fechaIndividual , this.codigoVaca).subscribe(
      res => {
        console.log(res);
        this.barChartDataMesesIndividual[0].data = [
          res.lecheMens[0].enero,
          res.lecheMens[0].febrero,
          res.lecheMens[0].marzo,
          res.lecheMens[0].abril,
          res.lecheMens[0].mayo,
          res.lecheMens[0].junio,
          res.lecheMens[0].julio,
          res.lecheMens[0].agosto,
          res.lecheMens[0].septiembre,
          res.lecheMens[0].octubre,
          res.lecheMens[0].noviembre,
          res.lecheMens[0].diciembre,
  
  
        ];

      }
    )



  }

  

}
