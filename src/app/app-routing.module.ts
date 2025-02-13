import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
      RouterModule.forRoot([
          { path: 'chat', loadChildren: () => import('./chat/chat.module').then(m => m.ChatModule) },
          { path: '**', redirectTo: '/chat' },
      ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
