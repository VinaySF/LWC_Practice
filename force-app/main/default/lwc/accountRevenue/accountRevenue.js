import { LightningElement ,wire} from 'lwc';
import accountList from '@salesforce/apex/DemoAcc.getAccount'

export default class AccountRevenue extends LightningElement {

    accountToDisplay=[]
    @wire(accountList)
    wiredAccounts({error,data}){
        if(data){
            this.accountToDisplay=data
        }
    }
}