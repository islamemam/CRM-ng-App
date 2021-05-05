import { Component, OnInit } from '@angular/core';
import { Event,Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'hollatfrontend';
  login:boolean;
  public language = 'ar';
  ltrboolean:boolean=false;
  constructor(private route:ActivatedRoute,private router:Router,    private translate: TranslateService,) {
    // i18n
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('ar');
    this.getLanguage();
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        this.language = event.lang;
    });
    // END i18n


  }
  ngOnInit(){
    if(localStorage.getItem('lang')=="en"){
      this.ltrboolean=true;
      document.body.style.direction ="ltr" ;
    }else{
      this.ltrboolean=false;
    }
    this.router.events.subscribe(
      (event: Event) => {
             if (event instanceof NavigationEnd) {

                if(localStorage.getItem('HollatLogin') == 'true'){
                  this.login = true;
                  if(this.router.url == '/login'){
                    return this.router.navigateByUrl("/");
                  }
                }else if(localStorage.getItem('HollatLogin') == 'false'){
                  this.login = false;
                  return this.router.navigateByUrl("/login");
                } else {
                  this.login = false;
                  localStorage.setItem('HollatLogin','false')
                  return this.router.navigateByUrl("/login");
                }

             }
      });
  }

    // Check if language saved in local storage
    getLanguage(): void {
      const lang = localStorage.getItem('lang');
      if (lang != null) {
        this.translate.use(lang);
        this.language = lang;
      } else {
        localStorage.setItem('lang', this.language);
      }
    }


}
