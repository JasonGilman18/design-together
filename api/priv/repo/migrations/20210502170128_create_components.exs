defmodule Api.Repo.Migrations.CreateComponents do
  use Ecto.Migration

  def change do
    create table(:components) do
      add :parent_id, :integer
      add :height, :integer
      add :width, :integer
      add :position_x, :integer
      add :position_y, :integer
      add :rounded, :integer
      add :align_horizontal, :string, default: "start"
      add :align_vertical, :string, default: "start"
      add :margin_top, :integer
      add :margin_right, :integer
      add :margin_bottom, :integer
      add :margin_left, :integer
      add :padding_top, :integer
      add :padding_right, :integer
      add :padding_bottom, :integer
      add :padding_left, :integer
      add :background, :string
      add :border, :boolean
      add :type, :string
      add :text, :string
      add :text_size, :integer
      add :text_bold, :boolean
      add :show_grid, :boolean
      add :document_id, references(:documents, on_delete: :nothing)

      timestamps()
    end

    create index(:components, [:document_id])
  end
end
