defmodule Api.Repo.Migrations.CreateShapes do
  use Ecto.Migration

  def change do
    create table(:shapes) do
      add :height, :integer
      add :width, :integer
      add :position_x, :integer
      add :position_y, :integer
      add :document_id, references(:documents, on_delete: :nothing)

      timestamps()
    end

    create index(:shapes, [:document_id])
  end
end
