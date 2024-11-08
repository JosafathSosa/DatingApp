import { CanDeactivateFn } from '@angular/router';
import { MemberComponent } from '../members/member/member.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberComponent> = (
  component
) => {
  if (component.editForm?.dirty) {
    return confirm('If you don´t save, changes will be lost');
  }
  return true;
};
