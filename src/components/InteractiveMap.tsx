<div className="relative w-full h-[700px] rounded-2xl overflow-hidden shadow-xl">
  <div ref={mapContainer} className="absolute inset-0" />

  {/* Search Bar */}
  <div className="absolute top-6 left-1/2 transform -translate-x-1/2 z-10 w-[90%] max-w-xl">
    <div className="bg-card/95 backdrop-blur-md border border-border rounded-full px-5 py-3 shadow-lg">
      <div className="flex items-center gap-3">
        <Search className="w-5 h-5 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search for produce... 🍓🥔🥬"
          value={searchQuery}
          onChange={handleSearchChange}
          className="border-0 bg-transparent focus-visible:ring-0 text-foreground placeholder:text-muted-foreground text-base"
        />
      </div>
      {highlightedFarms.length > 0 && (
        <div className="mt-2 text-sm text-center text-muted-foreground">
          ✅ Found <span className="font-medium">{highlightedFarms.length}</span> farm{highlightedFarms.length !== 1 ? 's' : ''} matching your search
        </div>
      )}
    </div>
  </div>

  {/* Selected Farm Card */}
  {selectedFarm && (
    <Card className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-md p-5 bg-card/95 backdrop-blur-md shadow-2xl rounded-xl border border-border z-10">
      <div className="space-y-4">
        {/* Farm Header */}
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{selectedFarm.name}</h3>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{selectedFarm.distance}</span>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>{selectedFarm.rating}</span>
              </div>
            </div>
          </div>
          <Badge variant="secondary">Eco {selectedFarm.ecoScore}/10</Badge>
        </div>

        {/* Produce List */}
        <div>
          <h4 className="text-sm font-medium mb-2">Available Produce:</h4>
          <div className="grid grid-cols-2 gap-2">
            {selectedFarm.produce.filter(p => p.available).slice(0, 4).map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm bg-muted/40 px-3 py-2 rounded-md">
                <span className="flex items-center gap-1">
                  {item.type} {item.organic && <Leaf className="w-3 h-3 text-green-500" />}
                </span>
                <span className="font-medium">{item.price} SEK/{item.unit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          {selectedFarm.deliveryAvailable && (
            <Badge variant="outline">🚚 Delivery</Badge>
          )}
          <button
            onClick={() => handleFarmSelect(selectedFarm)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            Visit Farm →
          </button>
        </div>
      </div>
    </Card>
  )}

  {/* Search Query Badge */}
  {searchQuery && (
    <div className="absolute top-6 right-6 z-10">
      <Badge className="bg-primary text-primary-foreground shadow-md">
        Searching: {searchQuery}
      </Badge>
    </div>
  )}
</div>
