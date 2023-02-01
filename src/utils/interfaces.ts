export interface IHeaderMobileMenu {
  mobileMenuId: string
  handleMobileMenuOpen(event: React.MouseEvent<HTMLElement>): void;
}

export interface IHeaderLink {
  title?: string
}