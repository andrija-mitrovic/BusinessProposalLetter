import { Component, OnInit } from "@angular/core";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4geodata_worldLow from "@amcharts/amcharts4-geodata/worldLow";
import am4geodata_usaLow from "@amcharts/amcharts4-geodata/usaLow";
import * as am4charts from "@amcharts/amcharts4/charts";
import { FileService } from 'src/app/service/file.service';

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})
export class DashboardComponent implements OnInit {
  excelFiles: string[];
  folderSize: string;
  constructor(private fileService: FileService) {}

  ngOnInit() {
    this.fileService.getFilesName().subscribe((filesName: string[]) => {
      this.excelFiles=filesName;
    });
    this.setMapChart();
    this.setPieChart();
  }

  setMapChart() {
    // Create map instance
    const chart = am4core.create("chartdiv", am4maps.MapChart);
    // Set map definition
    chart.geodata = am4geodata_worldLow;
    // Set projection
    chart.projection = new am4maps.projections.Miller();
    // Series for World map
    const worldSeries = chart.series.push(new am4maps.MapPolygonSeries());
    worldSeries.exclude = ["AQ"];
    worldSeries.useGeodata = true;

    const polygonTemplate = worldSeries.mapPolygons.template;
    polygonTemplate.tooltipText = "{name}";
    polygonTemplate.fill = chart.colors.getIndex(0);
    polygonTemplate.nonScalingStroke = true;
    // Hover state
    let hs = polygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    // Series for United States map
    const usaSeries = chart.series.push(new am4maps.MapPolygonSeries());
    // usaSeries.geodata = am4geodata_usaLow;

    const usPolygonTemplate = usaSeries.mapPolygons.template;
    usPolygonTemplate.tooltipText = "{name}";
    usPolygonTemplate.fill = chart.colors.getIndex(1);
    usPolygonTemplate.nonScalingStroke = true;

    // Hover state
    hs = usPolygonTemplate.states.create("hover");
    hs.properties.fill = am4core.color("#367B25");

    /* const lineSeries = chart.series.push(new am4maps.MapLineSeries());
lineSeries.data = [{
  multiGeoLine: [
    [
      { latitude: 48.856614, longitude: 2.352222 },
      { latitude: 40.712775, longitude: -74.005973 },
      { latitude: 49.282729, longitude: -123.120738 }
    ]
  ]
}];*/
  }

  setPieChart() {
    let chartPie = am4core.create("chartPie", am4charts.PieChart);

    // Add data
    chartPie.data = [
      {
        country: "Serbia",
        litres: 80
      },
      {
        country: "Montenegro",
        litres: 50
      },
      {
        country: "Croatia",
        litres: 70
      },
      {
        country: "Slovenia",
        litres: 30
      }
    ];

    // Add and configure Series
    let pieSeries = chartPie.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = "litres";
    pieSeries.dataFields.category = "country";
  }
}
