class ColumnsController < ApplicationController
  before_action :set_column, only: [:show, :update, :destroy]

  # GET /columns
  def index
    @columns = Column.all

    render json: @columns
  end

  # GET /columns/1
  def show
    render json: @column
  end

  # POST /columns
  def create
    @column = Column.new(column_params)

    if @column.save
      render json: @column, status: :created, location: @column
    else
      render json: @column.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /columns/1
  def update
    if @column.update(column_params)
      @column.board
             .columns
             .select { |c| c.id != @column.id }
             .each_with_index { |c, i| c.update(position: (i < @column.position ? i : i + 1)) }
      @boards = Board.all
      render json: @boards.to_json(include: {columns: {include: :tasks}})
    else
      render json: @column.errors, status: :unprocessable_entity
    end
  end

  # DELETE /columns/1
  def destroy
    @column.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_column
      @column = Column.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def column_params
      params.require(:column).permit(:board_id, :title, :position)
    end
end
