export class EditText {
  text: string;
  constructor(text: string) {
    this.text = text;
  }
  get title(): string {
    return `Editar ${this.text}`;
  }

  get description(): string {
    return `Edita los campos del grupo ${this.text.toLocaleLowerCase()} y guarda los cambios.`;
  }
}
