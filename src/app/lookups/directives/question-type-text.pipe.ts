import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'questionTypeText'})
export class QuestionTypeTextPipe implements PipeTransform {
  transform(questionType: string): string {
      if(questionType == 'rate'){
          return 'معدل';
      }else if(questionType == 'open_ended'){
        return 'كلامى';
      }
      else if(questionType == 'mcq'){
        return 'اختيار من متعدد';
      }
      else if(questionType == 'dichotomous'){
        return 'اختيار متعدد';
      }
      else if(questionType == 'likert_scale'){
        return 'مقياس الإعجاب';
      }
    return questionType;
  }
}