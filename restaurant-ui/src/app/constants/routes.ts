import NavbarComponent from "../layouts/navbar/navbar.component";
import { AdminComponent } from "../screens/admin/admin.component";
import { CookScreenComponent } from "../screens/cook/cook-screen/cook-screen.component";
import { SignInComponent } from "../screens/sign-in/sign-in.component";
import { TablesComponent } from "../screens/waiter/tables/tables.component";
import { WaiterComponent } from "../screens/waiter/waiter.component";

export const routs = [
    { path: '*', component: NavbarComponent },
    { path: 'sign-in', component: SignInComponent },
    { path: 'admin', component: AdminComponent }, 
    { path: 'waiter', component: WaiterComponent},
    { path: 'cook', component: CookScreenComponent}
]