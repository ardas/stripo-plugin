(
	function ($){
		$.fn.isAfter = function ($elm){
			var $this = $(this);
			var $myParents = $this.parents();
			var $elmParents = $elm.parents();

			var $myTreeLast = $this;

			var level = 0;
			for(var i in $myParents)
			{
				var $elmTreeLast = $elm;
				if (!$myParents.hasOwnProperty(i))
				{
					continue;
				}
				var $parent = $($myParents[i]);

				for (var j in $elmParents)
				{
					if (!$elmParents.hasOwnProperty(j))
					{
						continue;
					}

					var $elmParent = $($elmParents[j]);

					if ($parent[0] === $elmParent[0])
					{
						var myTreePos = $myTreeLast.index();
						var elmTreePos = $elmTreeLast.index();
						return (myTreePos > elmTreePos);
					}

					$elmTreeLast = $elmParent;
				}
				$myTreeLast = $parent;
			}

			return false;

		}
	})(jQuery);