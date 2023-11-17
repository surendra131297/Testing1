/**
@Description 		: After the case is escalated, schedule an Apex job to perform certain actions on the case after a delay of 9 hours.
@Author 			: Subba Reddy
@Last Modified By 	: Subba Reddy
@Last Modified On	: 28/04/2023
@Modification Log	:
Ver    		Date            Author          	LastModification
1.0   		26/04/2023     	Subba Reddy        	Initial Version
**/
public class EscalationTriggerHandler {
    
 public static void scheduleEscalation(List<Case> newCases) {
        for (Case c : newCases) {
            if (c.Status != 'Escalated' && c.Status != 'Closed' && c.Priority != 'High' && (c.SLA_Escalation_Time__c == Null || c.SLA_Escalation_Time__c == '')) { // only schedule escalation job for non-escalated Low/Medium Priority cases
                DynamicTimeValuesForEscalation__c dynamicCaseEscalationMentionedTimeValue = DynamicTimeValuesForEscalation__c.getInstance();
                system.debug('dynamicCaseEscalationMentionedTimeValue  : ' + dynamicCaseEscalationMentionedTimeValue);
                
                String timeString = dynamicCaseEscalationMentionedTimeValue.DynamicCaseEscalationTimeValue__c;
                List<String> timeComponents = timeString.split(':');
                
                Integer hours = Integer.valueOf(timeComponents[0]);
                Integer minutes = Integer.valueOf(timeComponents[1]);
                Integer seconds = Integer.valueOf(timeComponents[2]);
                
                system.debug('Hours: ' + hours);
                system.debug('Minutes: ' + minutes);
                system.debug('Seconds: ' + seconds);
                
                DateTime createdDateTime = c.CreatedDate;
                Integer createdHour = createdDateTime.hour();
                Integer createdDay = createdDateTime.day();
                Integer createdMonth = createdDateTime.month();
                Integer createdYear = createdDateTime.year();
                Integer createdMinute = createdDateTime.minute();
                Integer createdSecond = createdDateTime.second();
                
                Integer escalatedHour;
                Integer escalatedDay;
                
                Integer totalMinutes = createdMinute + minutes;
                Integer extraHours = totalMinutes / 60;
                Integer adjustedMinutes = Math.mod(totalMinutes, 60);
                system.debug('escalatedHour' + escalatedHour);
                escalatedHour = createdHour + hours + extraHours;
                system.debug('escalatedHour' + escalatedHour);
                
                if (escalatedHour > 23) {
                    escalatedHour = escalatedHour - 24;
                    escalatedDay = createdDay + 1;
                    system.debug('escalatedHour: ' + escalatedHour);
                } else {
                    escalatedDay = createdDay;
                    system.debug('Else escalatedHour: ' + escalatedHour);
                }
                
                // Handle months with 30 days
                Integer daysInMonth = Date.daysInMonth(createdYear, createdMonth);
                if (escalatedDay > daysInMonth) {
                    escalatedDay = escalatedDay - daysInMonth;
                    createdMonth++; // Increment the month
                }
                
                String scheduledHour = String.valueOf(escalatedHour);
                String scheduledDay = String.valueOf(escalatedDay);
                String scheduledMinute = String.valueOf(adjustedMinutes);
                String scheduledMonth = String.valueOf(createdMonth);
                String scheduledYear = String.valueOf(createdYear);
                String scheduledSecond = String.valueOf(createdSecond);
                
                String cronExpression = scheduledSecond + ' ' + scheduledMinute + ' ' + scheduledHour + ' ' + scheduledDay + ' ' + scheduledMonth + ' ? ' + scheduledYear;
                system.debug('cronExpression: ' + cronExpression);
                
                String jobID = System.schedule('Dynamic Case Escalation for LOW || MEDIUM Schedule Date and Time -- ' + c.Id, cronExpression, new caseEscalation(c, c.Id));
            }
            else if(c.Status != 'Escalated' && c.Status != 'Closed' && c.Priority == 'High' && (c.SLA_Escalation_Time__c == Null || c.SLA_Escalation_Time__c == '')) { // only schedule escalation job for non-escalated High Priority cases 
                DynamicTimeValuesForEscalation__c dynamicCaseEscalationMentionedTimeValue = DynamicTimeValuesForEscalation__c.getInstance();
                system.debug('dynamicCaseEscalationMentionedTimeValue  : ' + dynamicCaseEscalationMentionedTimeValue);
                
                String timeString = dynamicCaseEscalationMentionedTimeValue.CaseEscalationforHighPriority__c;
                List<String> timeComponents = timeString.split(':');
                
                Integer hours = Integer.valueOf(timeComponents[0]);
                Integer minutes = Integer.valueOf(timeComponents[1]);
                Integer seconds = Integer.valueOf(timeComponents[2]);
                
                system.debug('Hours: ' + hours);
                system.debug('Minutes: ' + minutes);
                system.debug('Seconds: ' + seconds);
                
                DateTime createdDateTime = c.CreatedDate;
                Integer createdHour = createdDateTime.hour();
                Integer createdDay = createdDateTime.day();
                Integer createdMonth = createdDateTime.month();
                Integer createdYear = createdDateTime.year();
                Integer createdMinute = createdDateTime.minute();
                Integer createdSecond = createdDateTime.second();
                
                Integer escalatedHour;
                Integer escalatedDay;
                
                Integer totalMinutes = createdMinute + minutes;
                Integer extraHours = totalMinutes / 60;
                Integer adjustedMinutes = Math.mod(totalMinutes, 60);
                system.debug('escalatedHour' + escalatedHour);
                escalatedHour = createdHour + hours + extraHours;
                system.debug('escalatedHour' + escalatedHour);
                
                if (escalatedHour > 23) {
                    escalatedHour = escalatedHour - 24;
                    escalatedDay = createdDay + 1;
                    system.debug('escalatedHour: ' + escalatedHour);
                } else {
                    escalatedDay = createdDay;
                    system.debug('Else escalatedHour: ' + escalatedHour);
                }
                
                // Handle months with 30 days
                Integer daysInMonth = Date.daysInMonth(createdYear, createdMonth);
                if (escalatedDay > daysInMonth) {
                    escalatedDay = escalatedDay - daysInMonth;
                    createdMonth++; // Increment the month
                }
                
                String scheduledHour = String.valueOf(escalatedHour);
                String scheduledDay = String.valueOf(escalatedDay);
                String scheduledMinute = String.valueOf(adjustedMinutes);
                String scheduledMonth = String.valueOf(createdMonth);
                String scheduledYear = String.valueOf(createdYear);
                String scheduledSecond = String.valueOf(createdSecond);
                
                String cronExpression = scheduledSecond + ' ' + scheduledMinute + ' ' + scheduledHour + ' ' + scheduledDay + ' ' + scheduledMonth + ' ? ' + scheduledYear;
                system.debug('cronExpression: ' + cronExpression);
                
                String jobID = System.schedule('Dynamic Case Escalation for HIGH Priority Schedule Date and Time -- ' + c.Id, cronExpression, new caseEscalation(c, c.Id));
            }
            else if(c.Status != 'Escalated' && c.Status != 'Closed' && (c.SLA_Escalation_Time__c != Null && c.SLA_Escalation_Time__c != '') ) { // only schedule escalation job for non-escalated SLA Escalation cases 
           /*     Case dynamicCaseEscalationMentionedTimeValue = Case.getInstance();
                system.debug('dynamicCaseEscalationMentionedTimeValue  : ' + dynamicCaseEscalationMentionedTimeValue); */
                
                String timeString = c.SLA_Escalation_Time__c;
                List<String> timeComponents = timeString.split(':');
                
                Integer hours = Integer.valueOf(timeComponents[0]);
                Integer minutes = Integer.valueOf(timeComponents[1]);
                Integer seconds = Integer.valueOf(timeComponents[2]);
                
                system.debug('Hours: ' + hours);
                system.debug('Minutes: ' + minutes);
                system.debug('Seconds: ' + seconds);
                
                DateTime createdDateTime = c.CreatedDate;
                Integer createdHour = createdDateTime.hour();
                Integer createdDay = createdDateTime.day();
                Integer createdMonth = createdDateTime.month();
                Integer createdYear = createdDateTime.year();
                Integer createdMinute = createdDateTime.minute();
                Integer createdSecond = createdDateTime.second();
                
                Integer escalatedHour;
                Integer escalatedDay;
                
                Integer totalMinutes = createdMinute + minutes;
                Integer extraHours = totalMinutes / 60;
                Integer adjustedMinutes = Math.mod(totalMinutes, 60);
                system.debug('escalatedHour' + escalatedHour);
                escalatedHour = createdHour + hours + extraHours;
                system.debug('escalatedHour' + escalatedHour);
                
                if (escalatedHour > 23) {
                    escalatedHour = escalatedHour - 24;
                    escalatedDay = createdDay + 1;
                    system.debug('escalatedHour: ' + escalatedHour);
                } else {
                    escalatedDay = createdDay;
                    system.debug('Else escalatedHour: ' + escalatedHour);
                }
                
                // Handle months with 30 days
                Integer daysInMonth = Date.daysInMonth(createdYear, createdMonth);
                if (escalatedDay > daysInMonth) {
                    escalatedDay = escalatedDay - daysInMonth;
                    createdMonth++; // Increment the month
                }
                
                String scheduledHour = String.valueOf(escalatedHour);
                String scheduledDay = String.valueOf(escalatedDay);
                String scheduledMinute = String.valueOf(adjustedMinutes);
                String scheduledMonth = String.valueOf(createdMonth);
                String scheduledYear = String.valueOf(createdYear);
                String scheduledSecond = String.valueOf(createdSecond);
                
                String cronExpression = scheduledSecond + ' ' + scheduledMinute + ' ' + scheduledHour + ' ' + scheduledDay + ' ' + scheduledMonth + ' ? ' + scheduledYear;
                system.debug('cronExpression: ' + cronExpression);
                
                String jobID = System.schedule('Dynamic Case Escalation for SLA Time Escalation Schedule Date and Time -- ' + c.Id, cronExpression, new caseEscalation(c, c.Id));
            }
        }
    }
}