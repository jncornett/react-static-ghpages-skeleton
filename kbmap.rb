require 'securerandom'

def secure_choice(a)
  a[SecureRandom.rand(a.size)]
end

def regularize(irregular_2d_array)
  max_row_size = 0
  data = irregular_2d_array.map do |row|
    max_row_size = row.size if row.size > max_row_size
    row.to_a
  end
  data.each do |row|
    until row.size == max_row_size
      row << nil
    end
  end
  data
end

class Pos
  attr_reader :x, :y

  def initialize(x, y)
    @x = x
    @y = y
  end

  def distance(other)
    dx = other.x - x
    dy = other.y - y
    Math.sqrt(dx**2 + dy**2)
  end

  def +(other)
    self.class.new(x + other.x, y + other.y)
  end
end

class Layout
  def initialize(d2iterable)
    @data = regularize(d2iterable)
  end

  def width
    @data.size
  end

  def height
    @data.first.size || 0
  end

  def in_bounds(pos)
    pos.x >= 0 && pos.x < width && pos.y >=0 && pos.y < height && !get(pos).nil?
  end

  def get(pos)
    @data[pos.x][pos.y]
  end

  NEIGHBOR_OFFSETS = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1]
  ].map { |c| Pos.new(*c) }

  def neighbor_coordinates(pos)
    raise "Position #{pos} out of bounds" unless in_bounds(pos)
    NEIGHBOR_OFFSETS
      .map { |off| pos + off }
      .select { |x| in_bounds(x) }
  end

  def find(x)
    @data.each_with_index do |row, i|
      row.each_with_index do |v, j|
        return Pos.new(i, j) if v == x
      end
    end
    nil
  end
end


class PasswordGenerator
  DEFAULT_MAX_DISTANCE = 4
  DEFAULT_LENGTH = 8
  KB_LAYOUT = Layout.new [
    [:'`', :'1', :'2', :'3', ':4', ':5', ':6', ':7', ':8', ':9', ':0',  :- , :'='],
    [nil ,  :q ,  :w ,  :e ,  :r ,  :t ,  :y ,  :u ,  :i ,  :o ,  :p , :'[', :']', :'\\'],
    [nil ,  :a ,  :s ,  :d ,  :f ,  :g ,  :h ,  :j ,  :k ,  :l , :';', :"'"],
    [nil ,  :z ,  :x ,  :c ,  :v ,  :b ,  :n ,  :m , :',', :'.', :'/']
  ]

  LEFT_HAND = 'asdfqwerzxcv'.split ''
  RIGHT_HAND = 'jkl;uiopnm,.'.split ''

  def initialize opts = {}
    @max_distance = opts[:max_distance] || DEFAULT_MAX_DISTANCE
    @length = opts[:length] || DEFAULT_LENGTH
  end

  def select_random_neighbor(pos)
    secure_choice(KB_LAYOUT.neighbor_coordinates(pos))
  end

  def select_valid_neighbor(start_pos, cur_pos)
    maybe = select_random_neighbor cur_pos
    until start_pos.distance(maybe) <= @max_distance
      maybe = select_random_neighbor cur_pos
    end
    maybe
  end

  def generate(start_set = LEFT_HAND)
    start_char = secure_choice(start_set).to_sym
    start_pos = KB_LAYOUT.find(start_char)
    raise "#{start_char} not in layout" if start_pos.nil?
    pass = [start_pos]
    while pass.size < @length
      pass << select_valid_neighbor(pass.first, pass.last)
    end
    pass.map { |pos| KB_LAYOUT.get(pos) }.join ''
  end
end

PASSWORD_GENERATOR = PasswordGenerator.new
puts PASSWORD_GENERATOR.generate
